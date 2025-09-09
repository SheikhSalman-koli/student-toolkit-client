import React, { useState } from 'react';
import useAuth from '../shared/Hooks/useAuth';

const Budget = () => {

    const [selectedType, setSelectedType] = useState('')
    const {user} = useAuth()

    const handleBudget = (e) => {
        e.preventDefault()
        const form = e.target
        const type = selectedType
        const category = form.category.value || ""
        const amount = parseInt(form.amount.value)
        const date = form.date.value
        const description = form.description.value
        const email = user?.email


        const budgetData = { type, category, amount, date, description, email}
        console.log(budgetData);
    

    }

    return (
        <div className='max-w-10/12 md:max-w-3/5 mx-auto my-10'>
            <h1 className='text-3xl text-[#F97316] text-center font-bold'>Track Your Budget</h1>

            <form onSubmit={handleBudget}
                className=''
            >
                <div className='grid grid-cols-1 md:grid-cols-2  gap-x-6'>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Type</legend>
                        <select name="type" onClick={(e) => setSelectedType(e.target.value)} className='select w-full' defaultValue='Select Type' required>
                            <option disabled={true}>Select Type</option>
                            <option value="Income">Income</option>
                            <option value="Expenses">Expenses</option>
                        </select>
                    </fieldset>

                    {
                        selectedType === "Income" ?

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Source</legend>
                                <select name="category" className='select w-full' defaultValue='select a source' required>
                                    <option disabled={true}>select a source</option>
                                    <option value="allowance">Allowance</option>
                                    <option value="part-time job">Part-time job</option>
                                    <option value="scholarship">Scholarship</option>
                                    <option value="tution">Tution</option>
                                </select>
                            </fieldset>

                            :

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Category</legend>
                                <select name="category" className='select w-full' defaultValue='select a category' required>
                                    <option disabled={true}>select a category</option>
                                    <option value="food">Food</option>
                                    <option value="school Fees">School Fees</option>
                                    <option value="transport">Transport</option>
                                    <option value="entertainment">Entertainment</option>
                                </select>
                            </fieldset>

                    }


                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Amount</legend>
                        <input
                            name='amount'
                            type="number"
                            className="input w-full"
                            placeholder="00.0 TK"
                            required
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Date</legend>
                        <input
                            name='date'
                            type="date"
                            className="input w-full"
                            placeholder="Enter Subject Name"
                            required

                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Description</legend>
                        <input
                            name='description'
                            type="text"
                            className="input w-full"
                            placeholder="Description"
                            required
                        />
                    </fieldset>



                </div>

                <button
                    type='submit'
                    className='btn bg-blue-600 hover:bg-blue-700 transition mt-6 text-white'
                >
                    Save

                </button>


            </form>


        </div>
    );
};

export default Budget;