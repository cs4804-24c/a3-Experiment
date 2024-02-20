library(ggplot2)
library(readr)
library(boot)
library(Hmisc)

data <- read_csv("/home/patrick/experiment_results_alldata.csv")

type <- data$`graphtype`
percent_error <- data$`percenterror`
log2error <- data$`log2error`

ggplot(data, aes(x = log2error, y = type)) + 
  stat_summary(fun.data = "mean_cl_boot")

