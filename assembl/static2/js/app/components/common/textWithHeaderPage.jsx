// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import DOMPurify from 'dompurify';

export type TextWithHeaderPageProps = {
  headerTitle: string,
  text: string,
  debateData: DebateData,
  renderPageBody: Function
};

type State = {};

class DumbTextWithHeaderPage extends React.Component<TextWithHeaderPageProps, State> {
  static defaultProps = {
    renderPageBody: (text: string) => (
      <div
        className="ellipsis-content justify"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text)
        }}
      />
    )
  };

  render() {
    const { headerTitle, debateData, renderPageBody, text } = this.props;
    return (
      <div className="text-with-header">
        <Header title={headerTitle} imgUrl={debateData.headerBackgroundUrl} />
        <div className="max-container margin-xxl">
          <div className="page-body">{renderPageBody(text)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  debateData: state.debate.debateData
});

export { DumbTextWithHeaderPage };

export default connect(mapStateToProps)(DumbTextWithHeaderPage);