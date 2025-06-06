// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ExerciseDashboard from "./pages/exercise-dashboard";
import ExerciseDetail from "./pages/exercise-detail";
import WorkoutBuilder from "./pages/workout-builder";
import WorkoutExecution from "./pages/workout-execution";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ExerciseDashboard />} />
          <Route path="/exercise-dashboard" element={<ExerciseDashboard />} />
          <Route path="/exercise-detail/:id" element={<ExerciseDetail />} />
          <Route path="/workout-builder" element={<WorkoutBuilder />} />
          <Route path="/workout-execution" element={<WorkoutExecution />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;