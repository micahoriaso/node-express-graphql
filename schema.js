const graphql = require('graphql');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

//Mock data
const posts = [
    {
        title: 'First post',
        description: 'Content of the first post',
        author: 'Flavio'
    },
    {
        title: 'Second post',
        description: 'Content of the second post',
        author: 'Roger'
    }
]

const authors = {
    'Flavio': {
        name: 'Flavio',
        age: 36
    },
    'Roger': {
        name: 'Roger',
        age: 7
    }
}

// GraphQLObjectTypes
const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    }
})

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        author: {
            type: authorType,
            resolve: (source, params) => authors[source.author]
        },
    }
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        author: {
            type: authorType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (source, {id}) => authors[id] 
        },
        post: {
            type: postType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (source, {id}) => posts[id]
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: () => posts
        },
    }

})


const schema = new GraphQLSchema({
    query: queryType
})

module.exports = schema;