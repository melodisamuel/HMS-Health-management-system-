const mongoose = require('mongoose');

const allocateResourcesSchema = new mongoose.Schema({
  hospitalBeds: {
    generalWards: { type: Number, default: 0 },
    icuBeds: { type: Number, default: 0 },
    pediatricBeds: { type: Number, default: 0 },
    maternityBeds: { type: Number, default: 0 },
  },
  medicalEquipment: {
    ventilators: { type: Number, default: 0 },
    cardiacMonitors: { type: Number, default: 0 },
    infusionPumps: { type: Number, default: 0 },
  },
  healthcarePersonnel: {
    doctors: { type: Number, default: 0 },
    nurses: { type: Number, default: 0 },
    technicians: { type: Number, default: 0 },
  },
  medicationAndSupplies: {
    medications: [{
      name: { type: String },
      quantity: { type: Number, default: 0 },
    }],
    medicalSupplies: [{
      name: { type: String },
      quantity: { type: Number, default: 0 },
    }],
  },
  operatingRooms: {
    totalRooms: { type: Number, default: 0 },
    availableRooms: { type: Number, default: 0 },
  },
  laboratoryResources: {
    laboratories: [{
      name: { type: String },
      equipment: [{ type: String }],
    }],
  },
  appointmentSlots: {
    totalSlots: { type: Number, default: 0 },
    availableSlots: { type: Number, default: 0 },
  },
  administrativeResources: {
    staffMembers: { type: Number, default: 0 },
    administrativeRooms: { type: Number, default: 0 },
  },
});

const AllocateResources = mongoose.model('AllocateResources', allocateResourcesSchema);

module.exports = AllocateResources;
