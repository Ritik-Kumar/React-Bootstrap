import React from 'react';
import Menu from './MenuComponent';
import { connect } from 'react-redux';

import Contact from './ContactComponent';
import Dishdetail from "./Dishdetail";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import Home from './HomeComponent';


class Main extends React.Component {

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail
          dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />
      );
    }



    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
};


const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders
})


export default withRouter(connect(mapStateToProps)(Main));
