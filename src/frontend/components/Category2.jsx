import { useState } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import tswira from '../assets/int.jpg'


const Category = () => {

  return (
    <div className="min-h-screen bg-netflix-black text-white">

      <div className="relative pt-16">
        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={tswira}
              alt="Interstellar"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 hero-overlay"></div>
            <div className="absolute inset-0 bottom-fade"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Interstellar</h1>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-green-500">96% Match</span>
              <span>2014</span>
              <span>2h 49m</span>
              <span className="border border-gray-600 px-1 text-xs">HD</span>
            </div>

            <div className="flex space-x-3 mb-6">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-white/40">
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-white/40">
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-white/40 ml-auto"
              >
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-white/90 text-sm md:text-base">
                  A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
                </p>
              </div>
              <div>
                <div className="text-sm space-y-2">
                  <p><span className="text-gray-400">Genres:</span> Science Fiction, Drama</p>
                  <p><span className="text-gray-400">Type:</span> Film</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-12 py-8">
        </div>
      </div>
    </div>
  );
};

export default Category;
