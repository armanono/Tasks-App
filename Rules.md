Before You Write a Component

 Does it have a single, clear responsibility?
 Can I name it clearly and specifically?
 Is it small enough to understand quickly?
 Are props clearly defined?

Before You Commit

 No console errors or warnings
 Proper key attributes on list items
 State updates don't mutate
 Event handlers named consistently
 No unused variables or imports
 Accessible (semantic HTML, ARIA labels)


Summary: The Golden Rules

One component, one job - Single Responsibility
Props down, events up - Unidirectional data flow
Never mutate state - Always create new objects/arrays
Keys are required - Use unique IDs, not indexes
Name things clearly - Components, props, and functions
Clean up side effects - Return cleanup from useEffect
Dependencies matter - Always specify correct dependencies
Accessibility first - Semantic HTML and ARIA labels
Optimize when needed - Measure before optimizing
Consistent style - Follow conventions throughout your app
