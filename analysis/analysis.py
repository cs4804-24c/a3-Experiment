import pandas as pd
import numpy as np
import math
import ast
import matplotlib.pyplot as plt

def findPercentDifference(a, b):
    #https://www.calculatorsoup.com/calculators/algebra/percent-difference-calculator.php
    absolute_difference = abs(a - b)
    average_value = (a + b) / 2
    percent_diff = (absolute_difference / average_value) * 100
    return percent_diff

def arrayAvg (data):
    if len(data) == 0:
        return 0
    else:
        return sum(data) / len(data)

#data is an array of arrays
def findAvgsForAll (data):
    allAvgs = []
    for i in data:
        avg = arrayAvg(i)
        allAvgs.append(avg)
    return allAvgs

def calculateError (judged, true):
    #based on the error caluclation given in the paper
    #log2(|judged - true| + 1/8)
    score = math.log2(abs(judged - true) + 1 / 8)
    return score

#data is the array for each of the viz type and number
def findAccuracyVector (data, true):
    intData = list(map(int, data))
    acc = []
    for i in intData:
        err = calculateError(i, true)
        acc.append(err)
    return np.array(acc)

#standard deviation
#data is an array of all the data arrays used
def std ():
    stdList = []
    df1 = pd.read_csv("all_arrays.csv")
    arrs = df1.iloc[:, 1]
    for i in arrs:
        intArr = ast.literal_eval(i)
        stdIntArr = np.std(intArr)
        stdIList = stdList.append(stdIntArr)

    return stdList

#convert to pandas df
df = pd.read_csv("/home/taya/PycharmProjects/dataVizExperiment/master.csv")

#reformat the titles and remove not needed columns
df = df.drop(df.columns[:2], axis=1) # drop names; use id from the data frame as id
df = df.drop([0])
df = df.drop([14]) # values need to be separated by hand
df.columns = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16', 'b17', 'b18', 'b19', 'b20',
              'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20',
              'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 'n20']
#df.to_csv("result.csv")
df = df.drop(columns=['n2']) #invalid results
df = df.fillna(-1)
df = df.replace('~', '', regex=True)
df = df.replace('%', '', regex=True)
df.to_csv("cleanedData.csv") #save cleaned data that we are actually working with


#each column in the dataframe is the reported percent difference; need to calculate the error between that and the real perpecent difference for each of the values
#append real percent difference as the last row for each of the columns

#percent differences for each of the arrays
dif1 = findPercentDifference(85,15)
dif2 = findPercentDifference(15,34)
dif3 = findPercentDifference(95,33)
dif4 = findPercentDifference(5,79)
dif5 = findPercentDifference(50,88)
dif6 = findPercentDifference(57,23)
dif7 = findPercentDifference(56,73)
dif8 = findPercentDifference(21,44)
dif9 = findPercentDifference(37,5)
dif10 = findPercentDifference(45,44)
dif11 = findPercentDifference(37,83)
dif12 = findPercentDifference(7,70)
dif13 = findPercentDifference(35,93)
dif14 = findPercentDifference(79,28)
dif15 = findPercentDifference(18,21)
dif16 = findPercentDifference(80,28)
dif17 = findPercentDifference(7,58)
dif18 = findPercentDifference(39,94)
dif19 = findPercentDifference(36,21)
dif20 = findPercentDifference(67,39)
#difArr = [dif1, dif2, dif3, dif4, dif5, dif6, dif7, dif8, dif9, dif10, dif11, dif12, dif13, dif14, dif15, dif16, dif17,dif18, dif19, dif20]
#difNp = np.array(difArr)
#difArrN = [dif1, dif3, dif4, dif5, dif6, dif7, dif8, dif9, dif10, dif11, dif12, dif13, dif14, dif15, dif16, dif17,dif18, dif19, dif20]
#difNNp = np.array(difArrN)

#create three dataframes for each viz type
bdf = df[['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16', 'b17', 'b18', 'b19', 'b20']].copy()
rdf = df[['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20']].copy()
ndf = df[['n1', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 'n20']].copy() #invalid data for n2

#create new rows for each of the errors for each column in each data frame
#bar charts analysis
b1Err = findAccuracyVector(bdf.iloc[:,0].values, dif1)
b2Err = findAccuracyVector(bdf.iloc[:,1].values, dif2)
b3Err = findAccuracyVector(bdf.iloc[:,2].values, dif3)
b4Err = findAccuracyVector(bdf.iloc[:,3].values, dif4)
b5Err = findAccuracyVector(bdf.iloc[:,4].values, dif5)
b6Err = findAccuracyVector(bdf.iloc[:,5].values, dif6)
b7Err = findAccuracyVector(bdf.iloc[:,6].values, dif7)
b8Err = findAccuracyVector(bdf.iloc[:,7].values, dif8)
b9Err = findAccuracyVector(bdf.iloc[:,8].values, dif9)
b10Err = findAccuracyVector(bdf.iloc[:,9].values, dif10)
b11Err = findAccuracyVector(bdf.iloc[:,10].values, dif11)
b12Err = findAccuracyVector(bdf.iloc[:,11].values, dif12)
b13Err = findAccuracyVector(bdf.iloc[:,12].values, dif13)
b14Err = findAccuracyVector(bdf.iloc[:,13].values, dif14)
b15Err = findAccuracyVector(bdf.iloc[:,14].values, dif15)
b16Err = findAccuracyVector(bdf.iloc[:,15].values, dif16)
b17Err = findAccuracyVector(bdf.iloc[:,16].values, dif17)
b18Err = findAccuracyVector(bdf.iloc[:,17].values, dif18)
b19Err = findAccuracyVector(bdf.iloc[:,18].values, dif19)
b20Err = findAccuracyVector(bdf.iloc[:,19].values, dif20)
bErrors = [b1Err, b2Err, b3Err, b4Err, b5Err, b6Err, b7Err, b8Err, b9Err, b10Err, b11Err, b12Err, b13Err, b14Err, b15Err, b16Err, b17Err, b18Err, b19Err, b20Err]



#insert the error columns into the dataframe and asve as csv
# Arrays of values for the new columns
new_columns_values = {
    'b1Error': b1Err,
    'b2Error': b2Err,
    'b3Error': b3Err,
    'b4Error': b4Err,
    'b5Error': b5Err,
    'b6Error': b6Err,
    'b7Error': b7Err,
    'b8Error': b8Err,
    'b9Error': b9Err,
    'b10Error': b10Err,
    'b11Error': b11Err,
    'b12Error': b12Err,
    'b13Error': b13Err,
    'b14Error': b14Err,
    'b15Error': b15Err,
    'b16Error': b16Err,
    'b17Error': b17Err,
    'b18Error': b18Err,
    'b19Error': b19Err,
    'b20Error': b20Err
}

# Add new columns to the DataFrame with the array values
for column_name, column_values in new_columns_values.items():
    bdf[column_name] = column_values
#bdf.to_csv("barChartWithErrors.csv")

#radar chart analysis
r1Err = findAccuracyVector(rdf.iloc[:,0].values, dif1)
r2Err = findAccuracyVector(rdf.iloc[:,1].values, dif2)
r3Err = findAccuracyVector(rdf.iloc[:,2].values, dif3)
r4Err = findAccuracyVector(rdf.iloc[:,3].values, dif4)
r5Err = findAccuracyVector(rdf.iloc[:,4].values, dif5)
r6Err = findAccuracyVector(rdf.iloc[:,5].values, dif6)
r7Err = findAccuracyVector(rdf.iloc[:,6].values, dif7)
r8Err = findAccuracyVector(rdf.iloc[:,7].values, dif8)
r9Err = findAccuracyVector(rdf.iloc[:,8].values, dif9)
r10Err = findAccuracyVector(rdf.iloc[:,9].values, dif10)
r11Err = findAccuracyVector(rdf.iloc[:,10].values, dif11)
r12Err = findAccuracyVector(rdf.iloc[:,11].values, dif12)
r13Err = findAccuracyVector(rdf.iloc[:,12].values, dif13)
r14Err = findAccuracyVector(rdf.iloc[:,13].values, dif14)
r15Err = findAccuracyVector(rdf.iloc[:,14].values, dif15)
r16Err = findAccuracyVector(rdf.iloc[:,15].values, dif16)
r17Err = findAccuracyVector(rdf.iloc[:,16].values, dif17)
r18Err = findAccuracyVector(rdf.iloc[:,17].values, dif18)
r19Err = findAccuracyVector(rdf.iloc[:,18].values, dif19)
r20Err = findAccuracyVector(rdf.iloc[:,19].values, dif20)
rErrors = [r1Err, r2Err, r3Err, r4Err, r5Err, r6Err, r7Err, r8Err, r9Err, r10Err, r11Err, r12Err, r13Err, r14Err, r15Err, r16Err, r17Err, r18Err, r19Err, r20Err]

#insert the error columns into the dataframe and asve as csv
# Arrays of values for the new columns
new_columns_values_r = {
    'r1Error': r1Err,
    'r2Error': r2Err,
    'r3Error': r3Err,
    'r4Error': r4Err,
    'r5Error': r5Err,
    'r6Error': r6Err,
    'r7Error': r7Err,
    'r8Error': r8Err,
    'r9Error': r9Err,
    'r10Error': r10Err,
    'r11Error': r11Err,
    'r12Error': r12Err,
    'r13Error': r13Err,
    'r14Error': r14Err,
    'r15Error': r15Err,
    'r16Error': r16Err,
    'r17Error': r17Err,
    'r18Error': r18Err,
    'r19Error': r19Err,
    'r20Error': r20Err
}

# Add new columns to the DataFrame with the array values - auto generated code for this portion
for column_name, column_values in new_columns_values_r.items():
    rdf[column_name] = column_values
#rdf.to_csv("radiusChartWithErrors.csv")

#donut chart analysis
n1Err = findAccuracyVector(ndf.iloc[:,0].values, dif1)
n3Err = findAccuracyVector(ndf.iloc[:,1].values, dif3)
n4Err = findAccuracyVector(ndf.iloc[:,2].values, dif4)
n5Err = findAccuracyVector(ndf.iloc[:,3].values, dif5)
n6Err = findAccuracyVector(ndf.iloc[:,4].values, dif6)
n7Err = findAccuracyVector(ndf.iloc[:,5].values, dif7)
n8Err = findAccuracyVector(ndf.iloc[:,6].values, dif8)
n9Err = findAccuracyVector(ndf.iloc[:,7].values, dif9)
n10Err = findAccuracyVector(ndf.iloc[:,8].values, dif10)
n11Err = findAccuracyVector(ndf.iloc[:,9].values, dif11)
n12Err = findAccuracyVector(ndf.iloc[:,10].values, dif12)
n13Err = findAccuracyVector(ndf.iloc[:,11].values, dif13)
n14Err = findAccuracyVector(ndf.iloc[:,12].values, dif14)
n15Err = findAccuracyVector(ndf.iloc[:,13].values, dif15)
n16Err = findAccuracyVector(ndf.iloc[:,14].values, dif16)
n17Err = findAccuracyVector(ndf.iloc[:,15].values, dif17)
n18Err = findAccuracyVector(ndf.iloc[:,16].values, dif18)
n19Err = findAccuracyVector(ndf.iloc[:,17].values, dif19)
n20Err = findAccuracyVector(ndf.iloc[:,18].values, dif20)
nErrors = [n1Err, n3Err, n4Err, n5Err, n6Err, n7Err, n8Err, n9Err, n10Err, n11Err, n12Err, n13Err, n14Err, n15Err, n16Err, n17Err, n18Err, n19Err, n20Err]

#insert the error columns into the dataframe and asve as csv
# Arrays of values for the new columns
new_columns_values_n = {
    'n1Error': n1Err,
    'n3Error': n3Err,
    'n4Error': n4Err,
    'n5Error': n5Err,
    'n6Error': n6Err,
    'n7Error': n7Err,
    'n8Error': n8Err,
    'n9Error': n9Err,
    'n10Error': n10Err,
    'n11Error': n11Err,
    'n12Error': n12Err,
    'n13Error': n13Err,
    'n14Error': n14Err,
    'n15Error': n15Err,
    'n16Error': n16Err,
    'n17Error': n17Err,
    'n18Error': n18Err,
    'n19Error': n19Err,
    'n20Error': n20Err
}

# Add new columns to the DataFrame with the array values - auto generated code for this portion
for column_name, column_values in new_columns_values_n.items():
    ndf[column_name] = column_values
#ndf.to_csv("donutChartWithErrors.csv")


#error analysis
#error averages across participants for each viz type for each individual viz
bErrorsAvg = findAvgsForAll(bErrors)
rErrorsAvg = findAvgsForAll(rErrors)
nErrorsAvg = findAvgsForAll(nErrors)

#average error for the plot type
bAvg = arrayAvg(bErrorsAvg)
rAvg = arrayAvg(rErrorsAvg)
nAvg = arrayAvg(nErrorsAvg)

#use the standard deviation of each of the 20 data arrays to see how the errors were affected by the data distribution
standDevList = std()
standDevListN = [26.887915501206113, 25.95398572473985, 29.947278777425495, 25.207885670956223, 24.277309469997718, 29.75078780469519, 22.894540834006694, 30.041467938806974, 27.43154745759647, 16.81695572926325, 33.044188102402195, 25.31180554602931, 24.716166549222166, 23.600847442411894, 20.8611480987984, 26.188484772775183, 29.040627140117998, 24.964174330427994, 18.156385129966107]


#graph the relationship between standard deviation of each dataset and the error averages; std is on the x axis and errors on the y
# Create the plot
coefficients = np.polyfit(standDevListN, nErrorsAvg, 1)
slope = coefficients[0]
intercept = coefficients[1]

# Create the scatter plot
plt.scatter(standDevListN, nErrorsAvg, color='blue', label='Data Points')

# Add the line of best fit
print(standDevListN)
print(slope)
timeSlope = [element * slope for element in standDevListN]
line = timeSlope + intercept
plt.plot(standDevListN, line, color='red', label='Line of Best Fit')

# Add labels and title
plt.xlabel('Standard Deviation of the Data Sets')
plt.ylabel('Average Errors for Each Bar Plot')
plt.title('The average errors for each radius plot based on standard deviation')

# Show the plot
plt.grid(True)
plt.show()






