const formulario = document.getElementById('formulario')
const ListaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

// Variable Global para todas las tareas como objeto
let tareas = {}

// Agregamoos eventos
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    if (Object.values(tareas).length == 0){
            ListaTareas.innerHTML =  `
            <div class="alert alert-dark">
                No Task pending 
                </div>
                
             `

            return
    }
    ListaTareas.innerHTML = ''
    Object.values(tareas).forEach((tarea) => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto
        if(tarea.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-check','fa-undo-alt' ,'text-success', 'fa')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary' )
            clone.querySelector('p').style.textDecoration = 'line-through'
        }   
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    ListaTareas.appendChild(fragment)
}