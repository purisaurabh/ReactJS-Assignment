# What Is Redux

- Redux is a pattern and library for managing and updating application state, using events called "actions".
- It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

# Why Should I Use Redux?

- Redux help to manage the global state
- state that is needed across many parts of your application
- The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur.

-Redux helps you deal with shared state management, but like any tool, it has tradeoffs. There are more concepts to learn, and more code to write. It also adds some indirection to your code, and asks you to follow certain restrictions. It's a trade-off between short term and long term productivity.

# Redux is more useful when:

- You have large amounts of application state that are needed in many places in the app
- The app state is updated frequently over time
- The logic to update that state may be complex
- The app has a medium or large-sized codebase, and might be worked on by many people

# React-Redux

- use to interact with redux store

# Redux Toolkit

-recommended approach for writing the logic

# Store

- The current redux application state lives in an object called store
- store is created by passing in reducer and has a method called getState that return the current state value

# Dispatch

- The only way to update the state it to call store.dispatc
- It will pass into the action

# Selectors

- selectors is like are the functions that know how to extract the specific information from the store state value

# Action

We know that actions are plain objects with a type field, the type field is always a string, and we typically have "action creator" functions that create and return the action objects. So where are those action objects, type strings, and action creators defined?

We could write those all by hand, every time. But, that would be tedious. Besides, what's really important in Redux is the reducer functions, and the logic they have for calculating new state.

Redux Toolkit has a function called createSlice, which takes care of the work of generating action type strings, action creator functions, and action objects.

# Thunk - Asynchronous Logic

A thunk is a specific kind of Redux function that can contain asynchronous logic. Thunks are written using two functions:

An inside thunk function, which gets dispatch and getState as arguments
The outside creator function, which creates and returns the thunk function

However, using thunks requires that the redux-thunk middleware (a type of plugin for Redux) be added to the Redux store when it's created. Fortunately, Redux Toolkit's configureStore function already sets that up for us automatically, so we can go ahead and use thunks here.

When you need to make AJAX calls to fetch data from the server, you can put that call in a thunk.
