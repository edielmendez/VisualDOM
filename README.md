# VisualDOM
Plugin que representa el árbol DOM de una página web de manera gráfica.

# Como agregarlo a tu proyecto
1. Primero descargalo del repositorio oficial de [GitHub](https://github.com/edielmendez/VisualDOM/).
2. Agregalo a tu proyecto en la carpeta donde tengas tus scripts JavaScripts <addr>libs/js/VisualDOM.js</addr> por ejemplo.
3. Si utilizas librerias extras en tu proyecto asegurate que tengan el siguiente orden
<addr><script src="libs/js/jquery-3.1.1.min.js" charset="utf-8"></script></addr><br>
<addr><script src="libs/js/go.js" charset="utf-8"></script></addr><br>
<addr><script src="libs/js/visualDOM.js" charset="utf-8"></script></addr>
4. Agrega el siguiente fragmento de código al final de tu pagina HTML

<button type="button" name="button" id="btnvisualDOM" class="fixed-action-btn horizontal ">Mostrar VisualDOM</button>
<div id="diVisualDOM" style="border: 1px solid black; width:100%; height:500px;display:none"></div>
