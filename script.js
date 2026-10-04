
 const data = JSON.parse(localStorage.getItem("college"))
        const college = data || [];
        showTable()
        let editIndex = null;

        class Students {
            constructor(name, age, course) {
                this.name = name;
                this.age = age;
                this.course = course

            }
        }


        document.getElementById("btn1").addEventListener("click", (e) => {
            e.preventDefault();
            let name = document.getElementById("in1").value.trim();
            let age = document.getElementById("in2").value.trim();
            let course = document.getElementById("in3").value.trim();
            if (name === "" || age === "" || course === "") {
                alert("fill all feild")
                return;
            }

            if (editIndex === null) {
                const student = new Students(name, age, course);
                college.push(student);

            } else {
                college[editIndex].name = document.getElementById("in1").value.trim();
                college[editIndex].age = document.getElementById("in2").value.trim();
                college[editIndex].course = document.getElementById("in3").value.trim();
                editIndex = null
            }


            localStorage.setItem("college", JSON.stringify(college))

            console.log(college)
            showTable()

            document.getElementById("in1").value = "";
            document.getElementById("in2").value = "";
            document.getElementById("in3").value = "";

        });


        // Show Table
        function showTable(list = college) {
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = "";

            list.forEach((item, index) => {
                tbody.innerHTML +=
                    `<tr>
                        <td>${index +1}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.course}</td>
                        <td class=action>
                            <button class=edit onclick="editItem(${index})">Edit</button>
                            <button class=delete onclick="deleteItem(${index})">Delete</button>                            
                        </td>
                    </tr>`
            })
        }


        // Delete Row
        function deleteItem(index) {
            let result = confirm("Are You Sure To Delete");
            if (result) {
                college.splice(index, 1);
                localStorage.setItem("college", JSON.stringify(college))
                console.log(college)
                showTable();
            }
        }


        // Edit Data
        function editItem(index) {
            editIndex = index;
            document.getElementById("in1").value = college[index].name;
            document.getElementById("in2").value = college[index].age;
            document.getElementById("in3").value = college[index].course;
        }


        // Search Dete 
        document.getElementById("search").addEventListener("input", () => {
            let search = document.getElementById("search").value.trim();
            let result = college.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
            console.log(result)
            showTable(result)
        });