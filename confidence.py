import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('master.csv')

error_stats = df.groupby('Vis Type')['Error'].agg(['mean', 'std'])
plt.figure(figsize=(10, 6))
plt.errorbar(x=error_stats['mean'], y=error_stats.index, xerr=error_stats['std'], fmt='none', color='black', capsize=5)
plt.scatter(error_stats['mean'], error_stats.index, color='red', zorder=5)

plt.xlabel('Error')
plt.ylabel('Vis Type')
plt.title('Results')
plt.tight_layout()
plt.show()
