library(ggplot2)
library(readr)
library(boot)

# Read CSV
treemapData <- read_csv("A3 Experiment Results/treemapMaster.csv")
voronoiData <- read_csv("A3 Experiment Results/voronoiMaster.csv")

#calculate the mean and bootstrap confidence interval
bootstrap_mean_ci <- function(data, index) {
  d <- data[index]
  return(mean(d))
}

boot1 <- boot(treemapData$Error, bootstrap_mean_ci, R=1000)
boot2 <- boot(voronoiData$Error, bootstrap_mean_ci, R=1000)

# confidence intervals
ci1 <- boot.ci(boot1, type="perc")
ci2 <- boot.ci(boot2, type="perc")

#new data frame
plot_data <- data.frame(
  Trial = c(1, 2),
  AvgError = c(mean(treemapData$Error), mean(voronoiData$Error)),
  LowerCI = c(ci1$percent[4], ci2$percent[4]),
  UpperCI = c(ci1$percent[5], ci2$percent[5]),
  TreemapType = c("Rectangle Treemap", "Voronoi Treemap")
)

#plot
p <- ggplot(plot_data, aes(x=AvgError, y=factor(Trial), color=TreemapType)) +
  geom_point(size=5) +
  geom_errorbarh(aes(xmin=LowerCI, xmax=UpperCI), height=0.1) + 
  geom_text(aes(label=round(AvgError, 2)), vjust=-1.5, size=5) + 
  labs(x="Average Error", y="Trial Number", title="             Average Error vs Trial Number with 95% Confidence Interval") +
  theme_minimal() +
  theme(axis.text.y = element_text(size =16),
        axis.text.x = element_text(size =16),
        axis.title = element_text(size =18),
        plot.title = element_text(size =24, hjust =0.5, margin = margin(t = 20, b = 20)),
        legend.text = element_text(size =20), 
        legend.title = element_text(size =22),
        plot.margin = margin(1, 1, 1, 1, "cm"), 
        panel.grid.major = element_line(color = "black", size = 0.5), 
        panel.grid.minor = element_line(color = "black", size = 0.5)) +  
  scale_y_discrete(labels=c("1", "2")) +
  scale_x_continuous(breaks=seq(floor(min(plot_data$LowerCI)), ceiling(max(plot_data$UpperCI)), by=0.1)) + 
 coord_fixed(ratio=0.75) + 
 coord_cartesian(ylim=c(0.5,2.5), xlim=c(min(plot_data$LowerCI), max(plot_data$UpperCI)), expand=F)

print(p)