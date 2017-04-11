import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VISIBILITY_FILTERS, addTodo, toggleTodo, setVisibilityFilter } from './actions/actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import '../public/css/App.css';

/* AddTodo -> onAddClick */
/* TodoList -> onTodoClick, Todo -> onTodoClick*/
/* Footer -> onFilterChange*/

/* 영민한 컴포넌트. */
class App extends Component {

    render() {
        let { dispatch, visibilityFilter, visibleTodos } = this.props;
        let filterOptions = [];

        for(let key in VISIBILITY_FILTERS) {
            if(VISIBILITY_FILTERS.hasOwnProperty(key)) {
                filterOptions.push(VISIBILITY_FILTERS[key]);
            }
        }

        return (
            <div>
                <h1>Todo List</h1>
                <AddTodo
                    onAddClick={(text) => dispatch(addTodo(text))}
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={(index) => dispatch(toggleTodo(index))}
                />
                <Footer
                    filter={visibilityFilter}
                    filterOptions={filterOptions}
                    onFilterChange={(filter) => dispatch(setVisibilityFilter(filter))}
                />
            </div>
        );
    }
}

const filterTodos = function(todos, filter) {
    if(filter === VISIBILITY_FILTERS.SHOW_ALL) {
        return todos;
    } else if(filter === VISIBILITY_FILTERS.SHOW_COMPLETED) {
        return todos.filter((todo) => todo.completed);
    } else if(filter === VISIBILITY_FILTERS.SHOW_ACTIVE) {
        return todos.filter((todo) => !todo.completed);
    }
};

const selector = function(state) {
    return {
        visibleTodos: filterTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
};

export default connect(selector)(App);
