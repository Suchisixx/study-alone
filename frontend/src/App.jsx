import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudyToDo from "./pages/ToDo";
import Studytime from "./pages/Study-Time";
import Layout from './components/Layout';
import { TimeProvider } from "./context/TimerContext";

export default function App() {
    return (
        <>
            <TimeProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Studytime />}></Route>
                            <Route path="/to-study" element={<StudyToDo />}></Route>
                        </Routes>
                    </Layout>
                </BrowserRouter >
            </TimeProvider >
        </>
    );
}