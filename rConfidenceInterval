library(ggplot2)
library(readr)
library(boot)

#The file is a different name because it wouldn't let me turn it into a csv.
#All the same data as Final File.
a3alldata <- read_csv("C:/Users/agiov/Downloads/a3alldata.csv", show_col_types = FALSE)

#extract columns
visType <- a3alldata$`Visualization Type`
ReportedPercent <- a3alldata$`Guessed Percentage`
TruePercent <- a3alldata$`Correct Percentage`

logbase2 <- log2(abs((ReportedPercent - TruePercent) + 1/8))

ggplot(a3alldata, aes(x = logbase2, y = visType)) +
  stat_summary(fun.data = "mean_cl_boot")

