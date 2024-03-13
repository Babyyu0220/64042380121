import React, { useState, useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [subjectID, setSubjectID] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API + '/user')
      .then(res => res.json())
      .then(result => {
        setUsers(result);
        console.log(result);
      });
  }, []);

  const handleAdd = () => {
    // เตรียมข้อมูลผู้ใช้ที่ต้องการเพิ่ม
    const newUser = { ID: users.length + 1, name, subjectID };
    
    // ทำการเพิ่มผู้ใช้ใหม่เข้าไปใน state
    setUsers([...users, newUser]);

    // เคลียร์ค่าในฟอร์มหลังจากเพิ่มผู้ใช้สำเร็จ
    setName('');
    setSubjectID('');
  };

  const handleDelete = (index) => {
    // สร้างรายชื่อผู้ใช้ใหม่โดยลบผู้ใช้ที่มี index ที่ระบุออกไป
    const updatedUsers = users.filter((user, i) => i !== index);

    // อัพเดท state ด้วยรายชื่อผู้ใช้ใหม่
    setUsers(updatedUsers);
  };

  const handleEdit = (index) => {
    // ทำการแก้ไขข้อมูลของผู้ใช้โดยใช้ index เพื่ออ้างอิงถึงผู้ใช้ที่ต้องการแก้ไข
    // ในที่นี้เราจะให้แก้ไขเฉพาะชื่อเท่านั้นเพื่อตัวอย่าง
    const updatedUsers = users.map((user, i) => {
      if (i === index) {
        return { ...user, name: prompt('แก้ไขชื่อผู้ใช้:', user.name) || user.name };
      }
      return user;
    });

    // อัพเดท state ด้วยรายชื่อผู้ใช้ที่มีการแก้ไขแล้ว
    setUsers(updatedUsers);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="ชื่อผู้ใช้" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="รหัสวิชา" 
        value={subjectID} 
        onChange={e => setSubjectID(e.target.value)} 
      />
      <button onClick={handleAdd}>เพิ่ม</button>
      
      <ul>
        {users.map((user, index) => (
          <div key={index}>
            <li>
              {user.ID} {user.name} {user.subjectID}
            </li>
            <button onClick={() => handleDelete(index)}>ลบ</button>
            <button onClick={() => handleEdit(index)}>แก้ไข</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
