const contact={template:`
<div>

    <button type="button" class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="addClick()">
        Add Contact
    </button>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>
                    Id
                </th>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    Phone Number
                </th>
                <th>
                    Options
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in contacts">
                <td>{{c.id}}</td>
                <td>{{c.firstName}}</td>
                <td>{{c.lastName}}</td>
                <td>{{c.phoneNumber}}</td>
                <td>
                    <button type="button" class="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="editClick(c)"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>

                    <button type="button" @click="deleteClick(c.id)" class="btn btn-light mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    
    <div class="modal fade" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" id="close" data-bs-dismiss="modal" 
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">First Name</span>
                        <input type="text" class="form-control" v-model="firstName">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Last Name</span>
                        <input type="text" class="form-control" v-model="lastName">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Phone Number</span>
                        <input type="text" class="form-control" v-model="phoneNumber">
                    </div>
                    <button type="button" @click="createClick()"
                    v-if="id==0" class="btn btn-primary">
                    Create
                    </button>
                    <button type="button" @click="updateClick()"
                    v-if="id!=0" class="btn btn-primary">
                    Update
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>
`
,

data() {
    return {
        contacts:[],
        modalTitle:"",
        id:0,
        firstName:"",
        lastName:"",
        phoneNumber:""
    }
},
methods: {
    refreshData(){
        axios.get(variables.API_URL+"contact")
        .then((response)=>{
            this.contacts=response.data;
            this.closeModal();
        });
    },
    addClick(){
        this.modalTitle="Add Contact";
        this.id=0;
        this.firstName="";
        this.lastName="";
        this.phoneNumber="";
    },
    editClick(c){
        this.modalTitle="Edit Contact";
        this.id=c.id;
        this.firstName=c.firstName;
        this.lastName=c.lastName;
        this.phoneNumber=c.phoneNumber;
    },
    createClick(){
        axios.post(variables.API_URL+"contact",{
            firstName:this.firstName,
            lastName:this.lastName,
            phoneNumber:this.phoneNumber
        })
        .then((response)=>{
            this.refreshData();
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"contact/"+this.id,{
            id:this.id,
            firstName:this.firstName,
            lastName:this.lastName,
            phoneNumber:this.phoneNumber
        })
        .then((response)=>{
            this.refreshData();
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"contact/"+id)
        .then((response)=>{
            this.refreshData();
        });
    },
    closeModal() {
        document.getElementById('close').click();
    }
},
mounted:function(){
    this.refreshData();
}

}