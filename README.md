# Travelling Salesman Algorithm
[Here](https://travelling-salesman--mileswatson.repl.co/) is a simple program that finds an approximate solution to the travelling salesman problem.

## What does it do?
The program adds 10000 black dots to a red background. Its task: to find the shortest path that goes through all the black dots exactly once. This is a traditionally hard problem to solve - in a canvas with 5 dots there are approximately 5!=120 different solutions, whereas on a canvas with 10 dots there are 10!=3628800 different combinations!

## How does it do it?
The algorithm I've used is almost entirely invented - although I am sure it has been used somewhere before. Here are the (very basic) steps of the algorithm:

    1. Create a random array of points
    2. Pick two random locations in the array
    3. Reverse the order of the points between the two locations
    4. If the total distance between the points decreased GOTO 2, else GOTO 5
    5. Revert the reversal back to before
    6. GOTO 2

My program, like the algorithm, never terminates - it will continue trying to optimise until the window/tab is closed. It will (almost) never find the shortest route. Instead, it will continually try to find a local minimum from the random order chosen in the first step. However, the aim of the algorithm is to find an approximate solution relatively quickly, not the shortest path.
