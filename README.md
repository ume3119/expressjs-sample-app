Question 1: Explain the differences in the 3 non-constructor functions below.
1)This is a static function. It is meant to be called on the class itself rather than the instance of class(object)
2)This is a member function which is to be called on the instance of class
3)This is called an arrow function which is part of ES6. They lexically binds this value & are always anonymous.

Question 2: Assume you have a column in a database that stores the amount of money a user has. Please list viable options for the column type, explain the pros/cons of each, and specify which one you would use and why.

1)Money type in  SQL ->  The problem with this type is has fixed & limited precision.But it is useful for casting results to that type for display to the user in a culture-sensitive way
2) Numeric / Decimal -> It is a popular choice and can hold any type of currency with precision. We can adjust the scale and precision to fit the needs of numbers we want to store.

I would use Decimal as it would give me more freedom & precision if i am dealing with different currencies.



Question 3: Assume you use the above money column in a Node.js codebase - how would you:

A) Perform math operations on the field?
I would have base currency i.e: dollar & then i would convert all types of currency values to dollar first & then would save it in the database.
Math operations would be simple as for simple variables.


B) Format the field for display?
We would have a currency type & all currency values against dollars stored in another table.
So we would just use that table & currency_type column to format the display


C) Update the field in the database?
Convert the currency value to dollars & then save back to database.
