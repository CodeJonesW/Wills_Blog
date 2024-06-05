---
title: "When to use Redux vs local component state in React"
date: "Jun 4, 2024"
excerpt: ""
cover_image: "/images/posts/redux-vs-local-component-state/redux.png"
---

When creating components developers are often presented with the choice to hold state in either redux or local component state. In order to decide one must consider the scope of the data and the complexity of the interactions.

Typically state that is relative to a single component or a small group of components will use local state. State regarding forms inputs, check box states, drop down menus, modals, typically follow this pattern. Local state is generally faster for updates as it does not require the overhead of Redux's dispatching and notifications to subscribers and is likely easier to manage / understand as the state logic is contained within the component itself.

Redux is used when the state needs to be shared across many parts of the application. A common use case is storing information about the logged in user to support authorization checks or display account information.

The choice to use redux also comes with the benefit of redux actions, which allow for easier debugging by providing a consistent approach to managing state that can be logged, persisted, and replayed. While the above benefits are notable, Redux can add complexity and boilerplate code, which might be overkill for simple state management needs.

When writing tests Redux states can be tested separately from UI components which can provide improved testability and reduce test complexity. When testing local state embedded within components tests could become more complex due to the test having to interact with Ui to generate a particular state for testing.

Lets create a scenario

- large production react application
- using redux for state management
- have a component that is used in multiple places
- the component can be used by different users with different permissions

With the component that is used in different parts of the application is is likely important to design your reducers to either include all the state needed for the component or to create a new reducer for each instance of the component. If one creates a new reducer desiging the state to have a similar data structure will make the component easier to manage as it evolves over time. If not the component could become filled with conditional logic or unknowing break to a misaligned data structure or missing data entirely.

If one reducer can be used for all instances of the component the reducer will likely be easier to manage and test. I think it is important to note that the redux state should be cleared on component in the case it is used in another part of the application. The thought behind this is to prevent the component from holding onto state that is no longer relevant and causing bugs or unexpected behavior.
