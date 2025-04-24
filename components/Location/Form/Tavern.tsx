import FormEditableTable from "@/components/Form/FormEditableTable";

export default function TavernFields(){
    return (
        <FormEditableTable
            name="menu"
            columns={[
                { label: "Name", field: "name" },
                { label: "Description", field: "description" },
                { label: "Price", field: "price" },
            ]}
        />
    )
}