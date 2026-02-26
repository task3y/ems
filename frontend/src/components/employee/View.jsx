import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('FULL RESPONSE:', response);
        console.log('DATA:', response.data);
        console.log('EMP:', response.data.employee);

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div>
      <h2>Employee Details</h2>

      <p>
        <strong>Name:</strong> {employee?.name}
      </p>
      <p>
        <strong>Department:</strong> {employee.department?.departmentName}
      </p>
      <p>
        <strong>Contract Type:</strong> {employee?.contractType}
      </p>
      <p>
        <strong>Email:</strong> {employee?.email}
      </p>
      <p>
        <strong>Phone No:</strong> {employee?.phoneNumber}
      </p>
      <p>
        <strong>Payroll ID:</strong> {employee?.payroll_id}
      </p>
    </div>
  );
};

export default View;
