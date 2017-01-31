import { globalIdField } from 'graphql-relay';
import { GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';
import { runCategoryQuery } from '../../services/googleDataStore/category';
import { nodeInterface } from '../nodeInterface';

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category list',
  fields: () => ({
    id: globalIdField('Author'),
    type: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});

const CategoryQuery = {
  description: 'Get Categories information',
  type: new GraphQLList(CategoryType),
  args: {
  },
  resolve: async () => {
    let categories = [];
    try {
      categories = await runCategoryQuery();
      console.log('CategoryQuery', categories);
    } catch (err) {
      console.log('CategoryQuery err', err);
    }
    console.log('CategoryQuery', categories);
    categories = categories.map(category => ({ ...category, id: category.type }));
    return categories;
  }
};

export default CategoryQuery;
