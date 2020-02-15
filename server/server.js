const { ApolloServer } = require("apollo-server");
const database = require("./database");
const service = require("./service");
const dns = require("dns");
const port = 3000;

const typeDefs = `

    type Item  {
        id: Int
        type: String
        description: String
    }

    type Domain {
        name: String
        extension: String
        checkout: String
        available: Boolean
    }

    type Query {
        items(type: String): [Item]
    }

    input ItemInput {
        type: String
        description: String
    }

    type Mutation{
        saveItem(item: ItemInput): Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
        generateDomain(name: String): [Domain]
    }
`;

const isDomainAvailable = url => {
  return new Promise((resolve, reject) => {
    dns.resolve(url, error => {
      if (error) resolve(true);
      else resolve(false);
    });
  });
};

const resolvers = {
  Query: {
    async items(_, args) {
      const items = await service.getItemsByType(args.type);
      return items.filter(item => item.type === args.type);
    }
  },
  Mutation: {
    async saveItem(_, args) {
      const item = args.item;
      // item.id = Math.floor(Math.random() * 1000);
      // items.push(item);
      const results = await service.saveItem(item);
      const newItem = await service.getItemById(results.insertId);
      console.log(newItem[0]);
      return newItem[0];
    },
    async deleteItem(_, args) {
      const { id } = args;
      const item = await service.deleteItem(id);
      return true;
    },
    async generateDomains() {
      const domains = [];
      const items = await service.getItems();

      for (const prefix of items.filter(item => item.type === "prefix")) {
        for (const sufix of items.filter(item => item.type === "sufix")) {
          const name = prefix.description + sufix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com`;
          const available = await isDomainAvailable(`${url}.com.br`);
          domains.push({
            name,
            checkout,
            available
          });
        }
      }

      return domains;
    },
    async generateDomain(_, args) {
      const { name } = args;
      const domains = [];
      const extensions = [".com.br", ".com", ".net", ".org"];
      for (const extension of extensions) {
        const url = name.toLowerCase();
        const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
        const available = await isDomainAvailable(`${url}${extension}`);
        domains.push({
          name,
          extension,
          checkout,
          available
        });
      }
      return domains;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
