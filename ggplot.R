library(ggplot2)
library(readr)
library(boot)
library(Hmisc)

a3alldata <- read_csv("Master Datafile.csv", show_col_types = FALSE)

ChartType <- a3alldata$`Chart Type`

Error <- a3alldata$`Error`

ggplot(a3alldata, aes(x = Error, y = ChartType)) + 
  stat_summary(fun.y = mean, geom = "point") +
  stat_summary(fun.data = "mean_cl_boot", conf.int = .99, geom = "errorbar")