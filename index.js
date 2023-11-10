const form = document.querySelector("#myform");
const display = document.querySelector(".display");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#number").value,
  };
  axios
    .post(
      "https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails",
      obj
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  createDetails(obj.email, obj.name, obj.phone);
});

function createDetails(x, y, z) {
  const ele = document.createElement("li");
  ele.textContent = x;
  const ele1 = document.createElement("li");
  ele1.textContent = "-" + y + "-" + z;
  const edit = document.createElement("button");
  edit.textContent = "Edit";
  ele1.append(edit);
  const del = document.createElement("button");
  del.textContent = "Delete";
  ele1.append(del);
  ele1.style.display = "inline-block";
  ele.append(ele1);
  display.append(ele);
  del.addEventListener("click", () => {
    const required = ele.firstChild.textContent;
    axios
      .get(
        "https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails"
      )
      .then((res) => {
        const data = res.data;
        data.forEach((val) => {
          if (val.email === required) {
            axios
              .delete(
                `https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails/${val._id}`
              )
              .then((res) => {
                console.log("object deleted");
                ele.remove();
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((err) => console.log(err));
  });
  edit.addEventListener("click", () => {
    const required = ele.firstChild.textContent;
    console.log(required);
    document.querySelector("#name").value = y;
    document.querySelector("#email").value = x;
    document.querySelector("#number").value = z;
    ele.remove();
    axios
      .get(
        "https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails"
      )
      .then((res) => {
        const data = res.data;
        data.forEach((val) => {
          if (val.email === required) {
            const obj = {
              name: y,
              email: x,
              phone: z,
            };
            axios
              .delete(
                `https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails/${val._id}`
              )
              .then((res) => {
                console.log("object deleted");
                ele.remove();
              })
              .catch((err) => console.log(err));
            axios
              .put(
                `https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails/${val._id}`,
                obj
              )
              .then((res) => {
                console.log("object update");
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((err) => console.log(err));
  });
}

window.addEventListener("load", () => {
  axios
    .get(
      "https://crudcrud.com/api/df3e7b875d3345b7b00a030fd16b07bb/appointmentDetails"
    )
    .then((res) => {
      const data = res.data;
      data.forEach((val) => {
        createDetails(val.email, val.name, val.phone);
      });
    })
    .catch((err) => console.log(err));
});
