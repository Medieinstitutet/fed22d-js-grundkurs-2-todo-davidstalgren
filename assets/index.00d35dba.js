(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(o){if(o.ep)return;o.ep=!0;const c=a(o);fetch(o.href,c)}})();const y=document.querySelector("#headerDate"),g=document.querySelector("#headerWeek"),s=new Date,D=s.getDate(),v=s.getMonth()+1,L=s.getFullYear(),k=S(s),b=D+"/"+v+" - "+L;function S(e){let t=new Date(e.getFullYear(),0,1),a=Math.floor((e-t)/(24*60*60*1e3));return Math.ceil(a/7)}y.innerHTML=b;g.innerHTML="Week "+k;const w=document.querySelector(".todo-form"),l=document.querySelector(".todo-input"),f=document.querySelector(".todo-input-date"),h=document.querySelector(".todo-items");let i="",u=document.querySelectorAll(".item"),r=[];w.addEventListener("submit",I);function I(e){if(e.preventDefault(),i=document.querySelector('input[name="category"]:checked'),f.value!==""&&l.value!==""){const t={id:Date.now(),name:l.value,completed:!1,dueDate:f.value,category:i.value};r.push(t),p(r)}else alert("Make sure to type a Todo and also choose a due date!");console.log(i.value)}function x(){u=document.querySelectorAll(".item"),u.forEach(e=>{e.querySelector(".delete-button").addEventListener("click",O)}),u.forEach(e=>{e.querySelector(".checkbox").addEventListener("click",A)})}function m(e){h.innerHTML="",C(),e.forEach(function(t){const a=t.completed?"checked":null,n=document.createElement("li");n.setAttribute("class","item"),n.setAttribute("data-key",t.id);const o=new Date(t.dueDate),c=new Date(s.getFullYear(),s.getMonth(),s.getDate()+5);o<s?n.classList.add("overdue"):o<=c&&n.classList.add("justintime"),t.completed===!0&&(n.classList.add("checked"),n.classList.remove("overdue"),n.classList.remove("justintime")),n.innerHTML=`
        <div class="item-category">
          <i class="${t.category}"></i>
        </div>
        <div class="todo-text">
          ${t.name}
        </div>
        <div class="icons-duedate">
          <div>
            <input class="checkbox" type="checkbox"  data-id="${t.id}" ${a}>
            <button class="delete-button" data-id="${t.id}"><i class="fa-solid fa-trash-can trashcan"></i></button>
          </div>
          <span class="due-date-text">Due date ${t.dueDate}</span>
        </div>
      `,h.append(n)}),f.value="",l.value="",x(),console.table(e)}function p(e){localStorage.setItem("todos",JSON.stringify(e)),m(e)}function q(){const e=localStorage.getItem("todos");e&&(r=JSON.parse(e),m(r))}function T(){r.sort((e,t)=>e.dueDate<t.dueDate?-1:e.dueDate>t.dueDate?1:0)}function M(){r.sort((e,t)=>e.id<t.id?-1:e.id>t.id?1:0)}function E(){r.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:e.name.toLowerCase()>t.name.toLowerCase()?1:0)}function N(){const e=sortOptions.value;e==="Name"?E():e==="Date added"?M():e==="Due date"&&T(),m(r)}function C(){r.sort((e,t)=>e.completed<t.completed?-1:e.completed>t.completed?1:0)}sortOptions.addEventListener("change",N);function O(e){const t=e.currentTarget.dataset.id,a=r.findIndex(n=>n.id==t);r.splice(a,1),p(r)}function A(e){const t=e.currentTarget.dataset.id,a=r.findIndex(n=>n.id==t);r[a].completed=!r[a].completed,p(r)}q();