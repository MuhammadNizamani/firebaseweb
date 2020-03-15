// db.collection('Cafe').get().then((snapshot) => {
//     console.log(snapshot.docs);
// })
const cafeList = document.querySelector('#cafe-list');
const form  = document.querySelector('#add-cafe-form');
//create element and render them
function renderCafe (doc)
{
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x'

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id =  e.target.parentElement.getAttribute('data-id');
        db.collection('Cafe').doc(id).delete(); //for deleting data
        
    })
}

//getting data
// db.collection('Cafe').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {

//          renderCafe(doc);
//     });
// });

// db.collection('Cafe').where('city', '==', 'Tando Allahyar').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {

//          renderCafe(doc);
//     });
// });
db.collection('Cafe').orderBy('city').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added')
        {
            renderCafe(change.doc);
        }
        else if (change.type == 'removed')
        {
                let li = cafeList.querySelector('[data-id='+change.doc.id+']');
                cafeList.removeChild(li);

        }
        
    });
})
// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Cafe').add(
        {
            name: form.name.value,
            city: form.city.value

        }
    );
form.name.value = '';
form.city.value = '';
})