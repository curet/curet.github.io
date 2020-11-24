Analysis of Vital Signs through SAX and Support Vector Machines
================

On this project my main focus was to analyse a dataset of hypotenstive and no hypotensive patients to try differenciate between a future patient outcome, using Support Vector Machines algorithms.

I analyzed multiple algorithms, first with a dataset of 18 patients and then with a dataset of 57 patients with more than 1 thousand datapoints or features and each datapoint representing the average of every minute. The more accuracy I got with during the experiment was with Linear, Polynomial and RBG (Radial basis function) algorithms, although the more consistent was the RBG (Radial basis function). I evaluated the distinct algorithms changing the Gamma and the Cost having in mind not to overfitting the predictions, also tried to always train the algorithm with around the 80 percent of the dataset, giving patients from both groups, and test with 20 percent of the dataset including both groups.

At the end the analysis still in progress and there is a lot to test and evaluate the be able to make better predictions, since the results I got weren’t too accurate with the algorithms I evaluated for all the situations. For future approaches it will be necessary to evaluate other types of algorithms that could fit better with time series, work with bigger dataset and consider boosting to see if combining multiple algorithms and reducing errors produce better outcome.



[return to Work](./)