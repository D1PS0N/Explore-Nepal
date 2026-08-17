const guideModel = require("../models/guideModel");

const getAllGuides = (req, res) => {
    guideModel.getAllGuides((err, guides) => {
        if (err) {
            console.error("Error fetching guides:", err);
            return res.status(500).json({
                message: "Error fetching guides"
            });
        }

        res.json(guides);
    });
};

const getGuidesByDestination = (req, res) => {
    const destinationId = req.params.destinationId;

    guideModel.getGuidesByDestination(destinationId, (err, guides) => {
        if (err) {
            console.error("Error fetching guides:", err);
            return res.status(500).json({
                message: "Error fetching guides"
            });
        }

        res.json(guides);
    });
};

const createGuide = (req, res) => { const { name, destination_id, role, expertise, bio, languages, specialties, contact, profile_image } = req.body; if (!name || !destination_id) return res.status(400).json({message:"Name and destination are required"}); guideModel.createGuide({name,destination_id,role,expertise,bio,languages,specialties,contact,profile_image},(err,result)=>{if(err){console.error(err);return res.status(500).json({message:"Error creating guide"});}res.status(201).json({message:"Guide profile created successfully",id:result.insertId});}); }; const updateGuide = (req, res) => { const { id }=req.params; const { name, destination_id, role, expertise, bio, languages, specialties, contact, profile_image }=req.body; if(!name||!destination_id)return res.status(400).json({message:"Name and destination are required"}); guideModel.updateGuide(id,{name,destination_id,role,expertise,bio,languages,specialties,contact,profile_image},(err,result)=>{if(err){console.error(err);return res.status(500).json({message:"Error updating guide"});}if(result.affectedRows===0)return res.status(404).json({message:"Guide not found"});res.json({message:"Guide profile updated successfully"});}); }; const deleteGuide = (req, res) => { const id = req.params.id; guideModel.deleteGuide(id, (err, result) => { if(err){ console.error(err); return res.status(500).json({message:"Error deleting guide"}); } if(result.affectedRows===0) return res.status(404).json({message:"Guide not found"}); res.json({message:"Guide profile deleted successfully"}); }); }; module.exports = {
    getAllGuides,
    getGuidesByDestination,
    createGuide,
    updateGuide,
    deleteGuide
};