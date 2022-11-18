(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-2",headers:{authorization:"eb99d5b8-4ad4-4eef-a501-82ecc082db67","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function o(e){document.addEventListener("keydown",r),e.classList.add("popup_opened")}function n(e){document.removeEventListener("keydown",r),e.classList.remove("popup_opened")}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_opened"))}var c=document.querySelector(".photo__cards"),a=document.querySelector("#card").content,u=document.querySelector("#image_popup"),i=u.querySelector(".popup__image "),l=u.querySelector(".popup__image-title");function s(n,r,c,s,p,d){var f=a.querySelector(".photo__card").cloneNode(!0),_=f.querySelector(".photo__image");_.src=c,_.alt=r,d&&f.querySelector(".photo__like").classList.add("photo__like_active");var m=f.querySelector(".photo__like-count");m.textContent=s,f.querySelector(".photo__title").textContent=r,f.querySelector(".photo__like").addEventListener("click",(function(o){var r;o.target.classList.contains("photo__like_active")?(r=n,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){o.target.classList.remove("photo__like_active"),m.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(o){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:e.headers}).then(t)}(n).then((function(e){o.target.classList.add("photo__like_active"),m.textContent=e.likes.length})).catch((function(e){console.log(e)}))}));var h=f.querySelector(".photo__delete");return p?h.addEventListener("click",(function(o){(function(o){return fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then(t)})(n).then((function(){o.target.closest(".photo__card").remove()})).catch((function(e){console.log(e)}))})):h.remove(),_.addEventListener("click",(function(e){i.src=c,i.alt=r,l.textContent=r,o(u)})),f}var p=function(e,t,o){_(e)?d(t,o):f(t,o)},d=function(e,t){e.classList.add(t),e.setAttribute("disabled",!0)},f=function(e,t){e.classList.remove(t),e.removeAttribute("disabled")},_=function(e){return e.some((function(e){return!e.validity.valid}))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var h,v,y,S,b,g,q,E=document.querySelector(".profile__name"),L=document.querySelector(".profile__discoverer"),k=document.querySelector(".profile__avatar"),C=document.getElementById("profile_edit"),x=C.querySelector(".popup__form"),A=C.querySelector(".popup__form-input_name"),U=C.querySelector(".popup__form-input_about"),w=x.querySelector(".popup__form-button"),T=document.getElementById("image_add"),B=T.querySelector(".popup__form"),j=T.querySelector(".popup__form-input_name"),I=T.querySelector(".popup__form-input_about"),O=B.querySelector(".popup__form-button"),P=document.querySelector(".profile__button"),D=document.querySelector(".profile__add-button"),N=document.querySelector(".profile__avatar-container"),J=document.getElementById("change_avatar_popup"),H=J.querySelector(".popup__form"),M=J.querySelector(".popup__form-input_about"),z=J.querySelector(".popup__form-button");function $(e,t,o){E.textContent=e,L.textContent=t,k.src=o}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,o,n=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var n,r,c=[],a=!0,u=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(e){u=!0,r=e}finally{try{a||null==o.return||o.return()}finally{if(u)throw r}}return c}}(t,o)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?m(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=n[0],a=n[1];$(r.name,r.about,r.avatar),function(e,t){e.forEach((function(e){var o=s(e._id,e.name,e.link,e.likes.length,e.owner._id===t,e.likes.some((function(e){return e._id===t})));c.append(o)}))}(a,r._id)})).catch((function(e){console.log(e)})),P.addEventListener("click",(function(){A.value=E.textContent,U.value=L.textContent,o(C)})),D.addEventListener("click",(function(){B.reset(),d(O,"popup__form-button_inactive"),o(T)})),N.addEventListener("click",(function(){H.reset(),d(z,"popup__form-button_inactive"),o(J)})),x.addEventListener("submit",(function(o){var r,c;o.preventDefault(),w.textContent="Сохранение...",(r=A.value,c=U.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:c})}).then(t)).then((function(e){$(e.name,e.about,e.avatar),n(C)})).catch((function(e){console.log(e)})).finally((function(e){w.textContent="Сохранить"}))})),B.addEventListener("submit",(function(o){var r,a;o.preventDefault(),O.textContent="Сохранение...",(r=j.value,a=I.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:a})}).then(t)).then((function(e){!function(e,t,o,n){var r=s(e,t,o,n,!0,!1);c.prepend(r)}(e._id,e.name,e.link,e.likes.length),n(T)})).catch((function(e){console.log(e)})).finally((function(e){O.textContent="Сохранить"}))})),H.addEventListener("submit",(function(o){var r;o.preventDefault(),z.textContent="Сохранение...",(r=M.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){k.src=e.avatar,n(J)})).catch((function(e){console.log(e)})).finally((function(e){z.textContent="Сохранить"}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&n(e)}))})),v=(h={formSelector:".popup__form",inputSelector:".popup__form-input",submitButtonSelector:".popup__form-button",inactiveButtonClass:"popup__form-button_inactive",inputErrorClass:"popup__form-input_error",errorClass:"form__input-error_active"}).formSelector,y=h.inputSelector,S=h.submitButtonSelector,b=h.inactiveButtonClass,g=h.inputErrorClass,q=h.errorClass,Array.from(document.querySelectorAll(v)).forEach((function(e){!function(e,t,o,n,r,c){var a=Array.from(e.querySelectorAll(t)),u=e.querySelector(o);p(a,u,n),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,o,n){t.validity.valid?function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),r.classList.remove(n),r.textContent=""}(e,t,o,n):function(e,t,o,n,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=o,c.classList.add(r)}(e,t,t.validationMessage,o,n)}(e,t,r,c),p(a,u,n)}))}))}(e,y,S,b,g,q)}))})();