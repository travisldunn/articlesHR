import React from "react";

class Articles extends React.Component {
  state = { articles: [], pages: 0 };
  componentDidMount() {
    this.fetchArticles(1);
  }

  fetchArticles = (page) => {
    fetch(`https://jsonmock.hackerrank.com/api/articles?page=${page}`).then(
      (res) =>
        res.json().then((data) => {
          this.setState({ articles: data.data, pages: data.total_pages });
        })
    );
  };

  renderBtns() {
    const btns = [];
    for (let i = 1; i <= this.state.pages; i++) {
      btns.push(
        <button
          onClick={() => this.fetchArticles(i)}
          data-testid="page-button"
          key={i}
        >
          {i}
        </button>
      );
    }
    return btns;
  }

  render() {
    const { articles } = this.state;
    return (
      <React.Fragment>
        {this.renderBtns()}
        <ul className="results">
          {articles.length
            ? articles.map((a) => {
                if (a.title) {
                  return (
                    <li key={a.title} data-testid="result-row">
                      {a.title}
                    </li>
                  );
                } else return null;
              })
            : null}
        </ul>
      </React.Fragment>
    );
  }
}

export default Articles;
