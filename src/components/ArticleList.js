import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article'
import PropTypes from 'prop-types'
import accordion from '../decorators/accordion'
import {connect} from 'react-redux'
import {deleteArticle} from '../AC'

class ArticlesList extends Component {
    articleRefs = []

    filterArticlesById(articles, filteredArticles) {
        if (Array.isArray(filteredArticles) && filteredArticles.length) {
            return articles.filter((article) => !filteredArticles.includes(article.id))
        }

        return articles
    }

    render() {
        const {articles, deleteArticle, toggleOpenItem, openItemId} = this.props
        const {filteredArticles} = this.props.filters

        let articlesToShow = this.filterArticlesById(articles, filteredArticles.map(a => a.value))

        const articleElements = articlesToShow.map(article => (
            <li key={article.id}>
                <Article
                    ref={this.setArticleRef}
                    article={article}
                    isOpen={article.id === openItemId}
                    toggleOpen={toggleOpenItem(article.id)}
                    handleDelete={deleteArticle}
                />
            </li>
        ))
        return (
            <ul ref={this.setContainerRef}>
                {articleElements}
            </ul>
        )
    }

    setContainerRef = (container) => {
        this.container = container
        console.log('---', container)
    }

    setArticleRef = (articleRef) => {
        this.articleRefs.push(articleRef)
    }

    componentDidMount() {
        console.log('---', this.articleRefs)
        console.log('---', 'own node: ', findDOMNode(this))
        console.log('---', 'nodes: ', this.articleRefs.map(findDOMNode))
    }
}

ArticlesList.propTypes = {
    //from connect
    deleteArticle: PropTypes.func.isRequired,
    articles: PropTypes.array.isRequired,
    //from accordion decorator
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func.isRequired
}

export default connect(
    ({articles, filters}) => ({articles, filters}),
    {deleteArticle},
)(accordion(ArticlesList))