import * as clack from "@clack/prompts"
import color from "picocolors"



let toDoItems = [
    {"Title": "English", "Description": "You have an English assignment to complete"},
    {"Title": "TXT", "Description": "Gurl you haven't watched the 'TXT Catch' episode yet"}
]


async function main(items) {
    console.clear();

    clack.intro(color.bold(color.blue("Annyeonghaseyo, This is My To-Do List")))

    
    let categories = await clack.select({
        message: color.cyan("Choose Your Option"),
        options: [
            {value: "show", label: "Show your to-do list"},
            {value: "add", label: "Add a to-do item"},
            {value: "delete", label: "Delete a to-do item"},
            {value: "quit", label: "Quit from app"}
        ]
    })





    switch (categories) {

        case "show":
            console.clear()
        
            clack.intro(color.bold(color.blue("Annyeonghaseyo, This is My To-Do List")))
            console.log(color.cyan("Show your to-do list\n"))
        
            if (items.length === 0) {
                console.log(color.red("You don't have any remaining to do\n"))
            } else {
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${color.bold(color.blue(item.Title))}: ${color.bgBlue(item.Description)}\n`)
                });
            }
        
            let option = await clack.select({
                message: color.cyan("Back to the category?"),
                options: [
                    { value: "back", label: "Back to the category" },
                    { value: "quit", label: "Quit from app" }
                ]
            });
        
            if (option === "back") {
                main(items);
            } else if (option === "quit") {
                console.log("Successfully Quitted")
            }
        
        break;

            



        case "add":
            console.clear();

            clack.intro(color.bold(color.blue("Annyeonghaseyo, This is My To-Do List")))
            
            let newTitle = await clack.text({
                message: color.cyan("Enter the title of the new to-do item:")
            })
            
            let newDescription = await clack.text({
                message: color.cyan("Enter the description of the new to-do item:")
            })
        
            items.push({"Title" : newTitle, "Description" : newDescription})
            
            console.log(color.green("New to-do item added successfully!\n"))


        
            let backOption = await clack.select({
                message: color.cyan("Back to the category?"),
                options: [
                    {value: "back", label: "Back to the category"},
                    {value: "quit", label: "Quit from app"}
                ]
            });

            if (backOption === "back") {
                main(items);
            } else if (backOption === "quit") {
                console.log("Successfully Quitted")
            }
            break;





        case "delete":
            console.clear();
            clack.intro(color.bold(color.blue("Annyeonghaseyo, This is My To-Do List")));


            let itemIndexToDelete = await clack.select({
                message: color.cyan("Select the to-do item you want to delete: "),
                options: items.map((item, index) => ({ value: index, label: `${item.Title}: ${item.Description}` }))
            });



            items.splice(parseInt(itemIndexToDelete), 1);

            console.log(color.red("To-do item deleted successfully!\n"));



            let backOptionDelete = await clack.select({
                message: color.cyan("Back to the category?"),
                options: [
                    { value: "back", label: "Back to the category" },
                    { value: "quit", label: "Quit from app" }
                ]
            });


            if (backOptionDelete === "back") {
                main(items);
            } else if (backOptionDelete === "quit") {
                console.log("Successfully Quitted");
            }
            break;


            

        case "quit":
            console.log("Successfully Quitted");
            break;
    }
}

main(toDoItems);
