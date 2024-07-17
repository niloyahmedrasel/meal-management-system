import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
    const queryClient = new QueryClient()
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
            <Toaster></Toaster>
        </QueryClientProvider>
    </div>
  );
}

export default App;
