import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bookshelf from '../components/Bookshelf'
import { bindActionCreators } from 'redux'
import { getBookshelf, createMix } from '../actions'
import _ from 'lodash'

class Books extends Component {

  componentWillReceiveProps(nextProps) {
    const params = nextProps.params
    const currentMixId = this.props.params.mix_id || false
    if (!nextProps.app.isFetchingBookshelf) {
      const mixUid = params.mix_id || false
      const username = params.username
      const bookshelf = this.props.bookshelf
      if (_.isEmpty(bookshelf) && _.isEmpty(this.props.errors)) {
        this.props.getBookshelf(username, mixUid)
      } else if (currentMixId !== mixUid){
        this.props.getBookshelf(username, mixUid)
      } else if (bookshelf.user && bookshelf.user.username.toLowerCase() !== username.toLowerCase()) {
        this.props.getBookshelf(username, mixUid)
      }
    }
  }

  componentWillMount(){
    const mixUid = this.props.params.mix_id || false
    const username = this.props.params.username
    this.props.getBookshelf(username, mixUid)
  }

  render(){
    return(
      <span>
        {!_.isEmpty(this.props.errors) &&
          <div>
            {this.props.errors}
          </div>
        }
        {!_.isEmpty(this.props.bookshelf) &&
          <Bookshelf
            params={this.props.params}
            bookshelf={this.props.bookshelf}
            app={this.props.app}
            createMix={this.props.createMix}
          />
        }
      </span>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let errors = []
  if (state.app.errors.bookshelf && state.app.errors.bookshelf.fetching) {
    errors = state.app.errors.bookshelf.fetching
  }
  return {
    errors: errors,
    bookshelf: state.bookshelf,
    app: state.app
  }
}

const mapDispatchToProps = ({
  getBookshelf: getBookshelf,
  createMix: createMix
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
