import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipeImage, getRecipe } from '../actions/recipes_actions'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline'
import Popover from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridTile: {
    margin: 10
  },
  paper: {
    minWidth: "40%"
  }
}

class Recipe extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {

  }

  handleClick = (e) => {
    // This prevents ghost click.
    e.preventDefault()
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  getFullRecipe = () => {
    this.props.getRecipe(this.props.recipe.id)
  }

  renderPopover = () => {
    const {recipeName, totalTimeInSeconds, ingredients, attributes} = this.props.recipe
    let ingredientsList = ingredients.map( (ingr, index) => <li key={index}>{ingr}</li> )
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Paper style={style.paper}>
          <h2>{recipeName}</h2>
          {attributes.cuisine ? <h3>{attributes.cuisine}</h3> : null}
          <p><strong>Cook Time: </strong>{totalTimeInSeconds / 60} mins</p>
          <h3>Ingredients:</h3>
          <ul>
            {ingredientsList}
          </ul>
          <RaisedButton label="View Full Recipe" onClick={this.getFullRecipe}/>
        </Paper>
      </Popover>
    )
  }

  render() {
    const {recipe} = this.props
    const {recipeName, imageUrlsBySize} = recipe
    return(
      <GridTile style={style.gridTile} title={recipeName} onClick={this.handleClick}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        actionIcon={
          <div>
            <IconButton>
              <ActionInfoOutline color="white" onClick={this.handleClick}/>
            </IconButton>
            {this.renderPopover()}
          </div>
        }
      >
        <img src={imageUrlsBySize["90"].slice(0, (imageUrlsBySize["90"].length - 6))} alt={recipeName}/>
      </GridTile>
    )
  }
}

const mapStateToProps = state => {
  return {
    myIngredients: state.ingredients.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipeImage: fetchRecipeImage,
    getRecipe: getRecipe
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
