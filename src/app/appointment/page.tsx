"use client";
import AuthForm from "@/components/AuthForm";
import Screen from "@/components/Screen";
import { newAppointmentFields } from "@/lib/FormsFields";
const handleSubmit = {};
const Appointments: React.FC = () => {
  return (
    <Screen>
      <AuthForm
        title="Agendar nuevo turno"
        subtitle=""
        linkText=""
        linkHref=""
        buttonText="Agendar"
        onSubmit={handleSubmit}
        inputFields={newAppointmentFields}
        googleButtonText=""
      />
    </Screen>
  );
};

export default Appointments;
