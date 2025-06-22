import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function CreateCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:5000/api/admin/categories', 
        { 
          name: categoryName,
          description: description 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('สร้างหมวดหมู่สำเร็จ');
      navigate('/admin/category-management');
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถสร้างหมวดหมู่ได้');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Create category</h1>
        <button
          onClick={handleSubmit}
          className="px-[40px] py-[12px] text-sm font-medium text-white bg-gray-900 rounded-[999px] hover:bg-gray-800 flex items-center gap-2 cursor-pointer"
        >
          Save
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="text-left block text-sm font-medium text-[#75716B] mb-2">
              Category name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="bg-white w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-400"
              required
            />
          </div>
          <div>
            <label className="text-left block text-sm font-medium text-[#75716B] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              className="bg-white w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-400 min-h-[300px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory; 