# Load necessary libraries
library(ggplot2)
library(grid)
library(dplyr)
library(Hmisc)

# Read the CSV file
data <- read.csv("experimentData.csv")

# Define colors for each plot
plot_colors <- c("blue", "green", "red", "orange")

# Create a list to store individual boxplots
plots <- lapply(seq_along(names(data)), function(i) {
  col_name <- names(data)[i]
  
  # Determine the title based on the column name
  title <- if (col_name == "Vert") {
    "Vertical Bar Chart"
  } else if (col_name == "UpsideDown") {
    "Upside Down Bar Chart"
  } else if (col_name == "Right2Left") {
    "Bar Chart Facing Left"
  } else if (col_name == "Left2Right") {
    "Bar Chart Facing Right"
  } else {
    col_name  # Use the column name as the title for other cases
  }
  
  # Create a boxplot for each column with specified color
  ggplot(data, aes(x = "", y = !!sym(col_name))) +  
    geom_boxplot(fill = plot_colors[i]) +  # Specify fill color
    stat_summary(geom = "errorbar", fun.data = mean_cl_boot, width = 0.1) +  # Add bootstrapped 95% CI
    labs(title = title, y = "log2(error)", x = " ")
})

# Arrange the plots in a grid
multiplot <- function(plotlist, cols) {
  numPlots <- length(plotlist)
  rows <- ceiling(numPlots / cols)
  
  # Set up the grid
  grid.newpage()
  pushViewport(viewport(layout = grid.layout(rows, cols)))
  
  # Make each plot, in the correct location
  for (i in 1:numPlots) {
    print(plotlist[[i]], vp = viewport(layout.pos.row = ((i - 1) %/% cols) + 1, layout.pos.col = (i - 1) %% cols + 1))
  }
}

# Display the plots in a grid
multiplot(plotlist = plots, cols = 2)
