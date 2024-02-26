library(ggplot2)
library(readr)
library(boot)

# Read CSV
#treemapData <- read_csv("D:/Organized School Folder/WPI/Senior/C Term/Data Visualization/a3/a3-Experiment/A3_Experiment_Results/treemapMaster.csv")
treemapData <- read_csv("A3_Experiment_Results/treemapMaster.csv")
#treemapData <- read_csv("/Users/aaronzhang/Projects/a3-Experiment/A3_Experiment_Results/treemapMaster.csv")
#voronoiData <- read_csv("D:/Organized School Folder/WPI/Senior/C Term/Data Visualization/a3/a3-Experiment/A3_Experiment_Results/voronoiMaster.csv")
voronoiData <- read_csv("A3_Experiment_Results/voronoiMaster.csv")
# voronoiData <- read_csv("/Users/aaronzhang/Projects/a3-Experiment/A3_Experiment_Results/voronoiMaster.csv")

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
  AvgError = c(mean(voronoiData$Error), mean(treemapData$Error)),
  LowerCI = c(ci2$percent[4], ci1$percent[4]),
  UpperCI = c(ci2$percent[5], ci1$percent[5]),
  TreemapType = c("Rectangle Treemap", "Voronoi Treemap")
)

#plot
p <- ggplot(plot_data, aes(x=AvgError, y=factor(Trial), color=TreemapType)) +
  geom_point(size=5) +
  geom_errorbarh(aes(xmin=LowerCI, xmax=UpperCI), height=0.1) + 
  geom_text(aes(label=round(AvgError, 2)), vjust=-1.5, size=5) + 
  labs(x="Average Error", y="Visualization", title="Average Error with 95% Confidence Interval for Different Tree Maps") +
  theme_minimal() +
  theme(axis.text.y = element_text(size =10, family = "Times New Roman"),
        axis.text.x = element_text(size =10, family = "Times New Roman"),
        axis.title = element_text(size =12, family = "Times New Roman", face = "bold"),
        plot.title = element_text(size =14, hjust =0.5, margin = margin(t = 20, b = 20), family = "Times New Roman", face = "bold"),
        legend.text = element_text(size =9, family = "Times New Roman"),
        legend.title = element_text(size =10, family = "Times New Roman", face = "bold"),
        plot.margin = margin(1, 1, 1, 1, "cm"), 
        panel.grid.major = element_line(color = "black", size = 0), 
        panel.grid.minor = element_line(color = "black", size = 0.1),  
  text = element_text(family = "Times New Roman")) + 
  scale_y_discrete(labels=c("2. Voronoi", "1. Rectangle")) +
  scale_x_continuous(breaks=seq(floor(min(plot_data$LowerCI)), ceiling(max(plot_data$UpperCI)), by=0.1)) + 
  coord_fixed(ratio=0.75) + 
  coord_cartesian(ylim=c(0.5,2.5), xlim=c(min(plot_data$LowerCI - 0.1), max(plot_data$UpperCI + 0.1)), expand=F) +
  scale_color_manual(values = c("#00203FFF", "red")) # Set point colors

# Adjust padding for x-axis title
p <- p + theme(axis.title.x = element_text(margin = margin(t = 20, r = 0, b = 0, l = 0), family = "Times New Roman", face = "bold"))
p <- p + theme(axis.title.y = element_text(margin = margin(t = 0, r = 20, b = 0, l = 0), family = "Times New Roman", face = "bold"))

print(p)

