
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';


const SUPABASE_URL = 'https://osquztvfekgnuwpzniwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcXV6dHZmZWtnbnV3cHpuaXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mjc2NDcsImV4cCI6MjA3MjIwMzY0N30.M9BLEDg-ynJ2rhQO5BUWES0Dunnov0rCqoXxlNCkguQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const products = JSON.parse(fs.readFileSync('./backend/data/products.json', 'utf-8'));

async function seedProducts() {
    for (let p of products) {
        const { data, error } = await supabase.from('products').insert([{
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image,
            category: p.category
        }]);
        if (error) console.error('Error inserting product:', p.name, error);
        else console.log('Inserted product:', p.name);
    }
}

seedProducts();
