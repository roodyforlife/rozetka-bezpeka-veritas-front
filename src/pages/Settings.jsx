import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import cl from './Settings.module.css'
import {Loader} from '../components/Loader';

export const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [searchText, setSearchText] = useState('')

    const filteredCategories = useMemo(() => {
      return categories?.filter(({name}) => name.toLowerCase().includes(searchText.toLowerCase()))
    }, [searchText, categories])

    const fetchCategories = async () => {
          try {
            const response = await axios.get('https://bezpeka-veritas-rozetka-server.onrender.com/get_all_categories', {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            return response.data
          } catch (error) {
            console.error(error)
            throw new Error(error)
          }
        };

        useEffect(() => {
            setLoading(true)
            fetchCategories().then((data) => setCategories(data)).catch((error) => alert(error)).finally(() => setLoading(false))
        }, [])

        const handleCategoryChange = (inputCategory, value) => {
            setCategories(categories.map((category) => {
                if (category.id === inputCategory.id) {
                    return {...category, checked: value}
                } else {
                    return category
                }
            }))
        }

        const handleCategoryPercentChange = (inputCategory, value) => {
            setCategories(categories.map((category) => {
                if (category.id === inputCategory.id) {
                    return {...category, percent: value}
                } else {
                    return category
                }
            }))
        }
        
        const onSave = async (event) => {
          event.preventDefault()
            setLoading(true)
            await axios.post('https://bezpeka-veritas-rozetka-server.onrender.com/settings', categories.filter((category) => category.checked), {
                headers: {
                  'Content-Type': 'application/json'
                }
              }).finally(() => setLoading(false));
        }

  return (
    <div>
      <Loader loading={loading}></Loader>
        <button className={cl.button} onClick={onSave}>Save</button>
        <div className={cl.flex}>
          <span>Пошук: </span>
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
       <div className={cl.items}>
       {filteredCategories?.map((category) => 
            <div className={cl.item}>
                <div className={cl.flex}>
                  <input type="checkbox" checked={category.checked} value={category.checked} onChange={(e) => handleCategoryChange(category, e.target.checked)}/>
                  <span>{category.name}</span>
                </div>
                {category?.checked && 
                <div>
                    <span>Відсоток: </span>
                    <input type="number" value={category.percent} onChange={(e) => handleCategoryPercentChange(category, e.target.value)} />
                </div>
                }
            </div>
        )}
       </div>
    </div>
  )
}
