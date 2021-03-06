import React from 'react'

import '../styles/Recipe.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { getRecipe, addFavorite, removeFavorite } from '../actions/recipes_actions'

import placeholder from '../images/placeholder_meal.png'

import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton'

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

const style = {
  menu: {
    minWidth: "40%",
    padding: 10,
    width: "auto",
    overflowWrap: 'break-word',
    borderTop: "none",
    borderBottom: "none"
  }
}

class Recipe extends React.Component {
  state = {
    open: false
  }

  showPopover = (e) => {
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
    const {recipe, getRecipe} = this.props
    typeof recipe.id === "number" ? getRecipe(recipe.recipeId) : getRecipe(recipe.id)
  }

  handleFavorite = () => {
    const {favorites, recipe} = this.props
    favorites.map( rec => {return {recipeId: rec.recipeId, id: rec.id} } ).find( rec => rec.recipeId === recipe.id || rec.id === recipe.id ) ? this.props.removeFavorite(recipe, userId) : this.props.addFavorite(recipe, userId)
  }

  renderPopover = () => {
    const {recipeName, totalTimeInSeconds, ingredients, attributes, id} = this.props.recipe
    let ingredientsList = ingredients.map( (ingr, index) => <li key={index}>{ingr.capitalize()}</li> )
    let favoriteIcon = this.props.favorites.map( recipe => {return {recipeId: recipe.recipeId, id: recipe.id} } ).find( recipe => recipe.recipeId === id || recipe.id === id ) ? <Favorite color="red"/> : <FavoriteBorder />
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        {/* <Menu className="Recipe-popover"> */}

        <Menu style={style.menu}>
          <h2>{recipeName}</h2>
          <RaisedButton
            className="Recipe-popover-favorite-button"
            label="Favorite"
            labelPosition="before"
            icon={favoriteIcon}
            onClick={this.handleFavorite}
          />
          {attributes.cuisine ? <h3>{attributes.cuisine}</h3> : null}
          <p><strong>Cook Time: </strong>{totalTimeInSeconds / 60} mins</p>
          <h3>Ingredients:</h3>
          <ul>
            {ingredientsList}
          </ul>
          <RaisedButton
            className="Recipe-full-detail-button"
            label="View Full Recipe"
            onClick={this.getFullRecipe}
          />
        </Menu>
      </Popover>
    )
  }

  render() {
    const {recipe} = this.props
    const {recipeName, smallImageUrls} = recipe
    const image = smallImageUrls ? smallImageUrls[0].slice(0, (smallImageUrls[0].length - 4)) : placeholder
    return(
      <GridTile
        className="Recipe-grid-tile"
        title={recipeName}
        onClick={this.showPopover}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        actionIcon={
          <div>
            <IconButton>
              <ActionInfoOutline color="white"/>
            </IconButton>
            {this.renderPopover()}
          </div>
        }
      >
        <img src={image} alt={recipeName}/>
      </GridTile>
    )
  }
}

const mapStateToProps = state => {
  return {
    myIngredients: state.ingredients.ingredients,
    favorites: state.recipes.favorites,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getRecipe: getRecipe,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
