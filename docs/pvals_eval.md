## Evaluating p-values

The objective of this project was to evaluate the effectiviness of different p-value methods. Using the some of the data from the following publication:

Elias D, Vever H, Lænkholm AV, et al. *Gene expression profiling
identifies FYN as an important molecule in tamoxifen resistance and a
predictor of early recurrence in patients treated with endocrine
therapy* \[published correction appears in Oncogene. 2018
Oct;37(41):5585-5586\]. Oncogene. 2015;34(15):1919‐1927.
<doi:10.1038/onc.2014.138>


``` r
# Si no ha instalado el paquete BiocManager, puede hacerlo con install.packages("BiocManager")
library(BiocManager)
#BiocManager::install("Biobase")
#BiocManager::install("GEOquery")
# Debería haber instalado "genefilter" para los ejercicios del curso en edX. 
# Si no lo ha instalado elimine el comentario de la siguiente instruccion
#BiocManager::install("genefilter")
library(GEOquery)
library(genefilter)
```

A continuación obtendremos el conjunto de datos

    ## Found 1 file(s)

    ## GSE67916_series_matrix.txt.gz

    ## Parsed with column specification:
    ## cols(
    ##   ID_REF = col_character(),
    ##   GSM1658401 = col_double(),
    ##   GSM1658402 = col_double(),
    ##   GSM1658403 = col_double(),
    ##   GSM1658404 = col_double(),
    ##   GSM1658405 = col_double(),
    ##   GSM1658406 = col_double(),
    ##   GSM1658407 = col_double(),
    ##   GSM1658408 = col_double(),
    ##   GSM1658409 = col_double(),
    ##   GSM1658410 = col_double(),
    ##   GSM1658411 = col_double(),
    ##   GSM1658412 = col_double(),
    ##   GSM1658413 = col_double(),
    ##   GSM1658414 = col_double(),
    ##   GSM1658415 = col_double(),
    ##   GSM1658416 = col_double(),
    ##   GSM1658417 = col_double(),
    ##   GSM1658418 = col_double()
    ## )

    ## [1] "ExpressionSet"
    ## attr(,"package")
    ## [1] "Biobase"

A continuación extraeremos los elementos de gset que usaremos en nuestro
análisis.

Podemos ver el resumen del artículo usando

``` r
abstract(experimentData(gset))
```

La matrix de expresiones puede obtenerse como

``` r
matexpr<-exprs(gset)
dim(matexpr)
```

    ## [1] 54675    18

El conjunto de datos contiene 54675 “features”. Para cada uno de ellos,
hay observaciones para 18 individuos.

Para saber cuáles de las líneas celulares son susceptibles y cuales son
resistentes al Tamoxifeno, extraeremos la información fenotípica.

``` r
pdata<-pData(phenoData(gset))
g=factor(pdata$`tamoxifen sensitivity:ch1`)
summary(g)
```

    ## resistant sensitive 
    ##        10         8

Vemos que hay 10 líneas resistentes y 8 susceptibles al Tamoxifeno.

# 1\. Realice pruebas t para comparar la expresión de todos los “features” para líneas celulares resistentes y susceptibles. ¿Cuántos p-valores son significativos?

``` r
rowttestD <- rowttests(matexpr, g)$p.value
sum(rowttestD < 0.05)
```

    ## [1] 20190

  - haciendo un rowttests del conjunto de datos podemos ver que 20190 p
    valores se encontraron como significativos

# 2\. Haga un histograma de los p-valores usando la opción freq=F, y superponga una línea horizontal en 1 (recuerde que si la hipótesis nula es cierta, los p-valores siguen una distribución uniforme). Comente sobre la cantidad de falsos positivos.

``` r
lthanfv <- sum(rowttestD < 0.05)
xlab_description <- c(paste("p-valores menores a 0.05, desde la columna vertical a la iszquierda\n  con un total de = " , lthanfv , sep=""))
par(bg = 'aliceblue')
hist(rowttestD, freq=F, xlab = xlab_description, ylab = "Densidad", col = "lightblue", border = "cadetblue", main = "Histograma de Pruebas T")
abline(h=1 , col="red")
abline(v=0.5, col="green", lty=2, lwd=3)
```

![](typeof_pvalues_evaluations_files/figure-gfm/unnamed-chunk-7-1.png)<!-- -->

  - Observando esta gráfica, tenemos que es relativamente uniforme, los
    valores distribuidos desde 0 a 1, observamos un pico de p valores
    cerca del 0, lo cuál podría representar la hipotesis alternativa y
    es donde los falsos positivos es probable que se encuentren.

  - Para este primer análisis tenemos que 20190 p valores tienen
    diferencia significativa por encontrarse por debajo de los 0.05 del
    estándar establecido.

\-Pero algo que hay que tener en cuenta es que a mayor cantidad de datos
mayor la posibilidad de encontrar FWER(family-wise error rate), o mejor
conocido como error de tipo I.

  - Si brevemente usamos el ejemplo presentado por Rafael Irizarry en el
    libro Data Analysis for the Life Sciences para encontrar la
    probabilidad de FWER tomando en consideración que cada muestra es
    independiente. Haciendo una muestra a larga escala.

En este caso haré un cálculo con 1000 datos y un p-valor menor a 0.05…

``` r
# Haciendo una prueba de FWER
B<-1000
minpval <- replicate(B, min(runif(1000,0,1))<0.05)
mean(minpval>=1)
```

    ## [1] 1

  - Aquí vemos que la probalidad es de 1, lo que que indica que es
    totalmente probable la ocurrencia. Por esta razón es mejor utilizar
    otro métodos para así dismunuir el error.

# 3\. ¿Cuántos p-valores son menores que 0.05 si se ajustan usando el método de Bonferroni?

``` r
bonferroniPvals <- round(p.adjust(rowttestD,method="bonferroni"),4)
sum(bonferroniPvals < 0.05)
```

    ## [1] 274

  - Ajustando los p valores que obtuvimos antes, al método de Bonferroni
    tenemos que 274 p valores son menores a 0.05. Si hacemos un poco de
    matemática, 20190(valor anterior)/274(Bonferroni) = 73.6861313869
    veces más pequeño. Lo que ajusta bastante, pero también por evitar
    tener errores de tipo I podriamos comenzar a estar obteniendo
    errores de tipo II, y tendríamos falsos negativos.

# 4\. Ajuste los p-valores usando el método de Benjamini y Hochberg ( “False Discovery Rate”) ¿Cuál es el número de p-valores significativos al 5% luego de este ajuste?

``` r
benjamin.hochberg <- round(p.adjust(rowttestD,method="BH"),4)
sum(benjamin.hochberg < 0.05)
```

    ## [1] 11827

  - usando el ajuste de Benjamini y Hochberg tenemos que 11827 se
    considera significativos

# 5\. Repita el ejercicio usando el ajuste en el paquete `qvalue` y reporte el número de p-valores significativos.

``` r
#BiocManager::install("qvalue")
library(qvalue)
qval = qvalue(rowttestD)
sumQvals <- sum(qval$qvalue < 0.05)
sumQvals
```

    ## [1] 19367

  - usando el paquete de `qvalue` para ajustar los p valores tenemos que
    19367 se consideran significativos

  - usando el qvalue y el método de Benjamini y Hochberg podemos ver que
    son menos consevadores que Bonferroni y el ajuste permite la entrada
    más p valores.

  - Considero que cada método podría ser usado dependiendo de la
    investigación u estilo. Si alguién quiere un poco más de apertura en
    la evaluación de los datos y sacrificar tener la probabilidad de
    tener un poco más de error tipo I, pues podría usar Benjamini &
    Hochberg o qvalue. Si al contrario prefiere ser un poco conservador
    y prefiere tener errores de tipo II, pues podría escoger Bonferroni.






















[return to Work](./)
