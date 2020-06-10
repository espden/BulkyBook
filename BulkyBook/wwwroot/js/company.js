var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $("#tblData").DataTable({
        "ajax": {
            "url": "/Admin/Company/GetAll"
        },
        "columns": [
            { "data": "name", "width": "10%" },
            { "data": "streetAddress", "width": "10%" },
            { "data": "city", "width": "10%" },
            { "data": "state", "width": "10%" },
            { "data": "postalCode", "width": "10%" },
            { "data": "phoneNumber", "width": "10%" },
            {
                "data": "isAuthorizedCompany", "width": "5%", "render": function (data) {
                    if (data)
                        return `<input type="checkbox" checked disabled>`;
                    else
                        return `<input type="checkbox" disabled>`;
                }
            },
            {
                "data" : "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/Admin/Company/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer;">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a onclick=Delete("/Admin/Company/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer;">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                        `;
                }, "width" : "15%"
            }
        ]
    });
}

/*
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsAuthorizedCompany { get; set; }
 */

function Delete(url) {
    swal({
        title: "Are you sure you want to Delete?",
        text: "You will not be able to restore the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}