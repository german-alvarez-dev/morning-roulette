
var students = [
    'sara',
    'salvador',
    'roberto',
    'ricardo molpeceres',
    'ricardo ronchetti',
    'monica',
    'mikel',
    'miguel',
    'mario',
    'laura',
    'judit',
    'jorge alberto',
    'jean carlo',
    'iñigo',
    'inés',
    'hiba',
    'gustavo',
    'guille rodríguez',
    'guille pérez',
    'guille ávila',
    'gonzalo',
    'estefanía',
    'ernesto',
    'eduardo',
    'diego',
    'cristian',
    'arseni',
    'anna maria',
    'angela',
    'andrés',
    'andre',
    'ana',
    'albert',
    'germán'
]

var content = {
    web: students.map((elm, idx) => {
        return { type: 'allin', color: idx % 2 ? '#209b6c' : '#dc0936', text: elm, desc: 'GO!' }
    })
}
