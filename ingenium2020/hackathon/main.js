
//counter //fuck jquery
finaldate = new Date('14 March 2020');
setInterval(()=>{
let timeleft = finaldate - new Date ();
d = document.getElementById('days');
h = document.getElementById('hours');
m = document.getElementById('mins');
s = document.getElementById('secs');
d.innerHTML = Math.floor(timeleft/(1000*60*60*24));
h.innerHTML = Math.floor((timeleft/(1000*60*60))%60);
m.innerHTML = Math.floor((timeleft/(1000*60))%60);
s.innerHTML = Math.floor((timeleft/(1000))%60);
},1000);

// timeline 
document.getElementById('14th').addEventListener('click',() =>{
    document.getElementById('14th').classList.remove('current-day');
    document.getElementById('15th').classList.add('current-day');

    document.getElementById('14th list').classList.remove('hidden');
    document.getElementById('15th list').classList.add('hidden');
});

document.getElementById('15th').addEventListener('click',() =>{
    document.getElementById('14th').classList.add('current-day');
    document.getElementById('15th').classList.remove('current-day');

    document.getElementById('15th list').classList.remove('hidden');
    document.getElementById('14th list').classList.add('hidden');
});

// navigation
document.getElementById('clear').addEventListener('click',()=>{
    document.getElementById('nav-list').classList.add('nav-hide');
})
document.getElementById('menu-icon').addEventListener('click',()=>{
    document.getElementById('nav-list').classList.remove('nav-hide');
})
let ll = document.getElementsByClassName('link')

for (let link of ll) {
    link.addEventListener('click',()=>{
    document.getElementById('nav-list').classList.add('nav-hide');
    })
}
//faq

buttons = document.getElementsByClassName('add')
for (let b of buttons){
    b.addEventListener('click',(e)=>{
        b.nextElementSibling.classList.toggle('active');
    })
}
