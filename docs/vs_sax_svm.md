Analysis of Vital Signs through SAX and Support Vector Machines
================

On this project, during my summer internship my main focus was to analyse a dataset of hypotenstive and no hypotensive patients to try differenciate between using Support Vector Machines algorithms.

I analyzed multiple algorithms, first with a dataset of 18 patients and then with a dataset of 57 patients with more than 1 thousand datapoints or features, each datapoint representing the average of taken information per minute.

During the experiment between Linear, Polynomial and RBG (Radial basis function) algorithms, the ones I ended up staying with the RGB was the one appeared more accurate and consistent. For the different tests changed the Gamma and the Cost being careful not to overfitting the predictions, also tried to always train the algorithm with around the 80 percent of the dataset including hypotensive and no hypotensive, and test with 20 percent of the dataset including same both groups.

The study still in progress and there is a lot still to do and evaluate to be able to make better predictions, since the results I got weren’t too accurate as expected or in a level that are actually very useful.

For future approaches it will be necessary to evaluate other types of algorithms that could fit better with time series datasets, work with bigger datasets and consider boosting if that helps in future analysis.



[return to Work](./)